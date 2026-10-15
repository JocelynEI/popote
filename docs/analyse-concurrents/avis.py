#!/usr/bin/env python3
"""avis.py : classe les avis réels d'applis concurrentes. Bibliothèque standard uniquement.
Inspiré de reviews.py (replica-skill, J. Schincariol, licence MIT), adapté en français.

    python3 avis.py avis.csv --out rapport-avis.md [--themes themes-en-plus.json] [--mois 18]

CSV attendu (colonnes en plus ignorées) : appli,source,url,date,note,texte
  appli  nom du concurrent (facultatif)   source  app-store, google-play, reddit...
  url    lien de l'avis ou de la page où il a été lu (obligatoire)
  date   AAAA-MM-JJ ou AAAA-MM            note    1 à 5, vide si pas d'étoiles
  texte  l'avis copié tel quel (obligatoire)
Une ligne sans lien ou sans texte est écartée et comptée, jamais devinée.
Chaque citation imprimée est un extrait exact d'une ligne fournie, avec son lien.
Poids : 1 étoile = 1,0 ; 5 étoiles = 0,2 ; sans note = 0,6 ; avis plus vieux que --mois : moitié.
Un thème avec moins de 3 avis ou une seule source est marqué « fragile ».
"""
import argparse, csv, datetime as dt, json, re, sys

THEMES = [
 ("prix", "Prix, abonnement, version gratuite trop limitée", "plainte", r"abonnement|premium|payant|trop cher|\bcher\b|hors de prix|paywall|version gratuite|essai gratuit|\bprix\b|tarif|subscription|expensive|overpriced|not worth"),
 ("facturation", "Prélèvements, résiliation, remboursement", "plainte", r"rembours|prélev|débité|résili|arnaque|escroquer|refund|charged|cancel"),
 ("pubs", "Publicités", "plainte", r"\bpubs?\b|publicit|annonces|\bads\b|advert"),
 ("bugs", "Bugs et plantages", "plainte", r"\bbugs?\b|\bbeugs?\b|bugu|plant(e|é|ages?)\b|crash|ne (marche|fonctionne) (plus|pas)|erreur|bloqu|freeze|not working"),
 ("lenteur", "Lenteur, batterie", "plainte", r"\blente?\b|\brame\b|chargement|batterie|lourde?\b|\bslow\b|\blag"),
 ("donnees", "Données perdues, synchro, sauvegarde", "plainte", r"perdu|disparu|effacé|synchro|sauvegard|\bsync\b|lost my"),
 ("compte", "Compte obligatoire, connexion", "plainte", r"créer un compte|compte obligatoire|connexion|se connecter|mot de passe|inscription|adresse (e-?)?mail|log ?in|sign ?in|password"),
 ("complexite", "Compliqué, pas intuitif, surchargé", "plainte", r"compliqu|pas intuiti|peu intuiti|confus|ergonomi|illisible|surcharg|trop de (clics|étapes|menus|fonctions)|on s'y perd|confusing|cluttered"),
 ("maj", "Une mise à jour a tout gâché", "plainte", r"mise à jour|nouvelle version|nouvel affichage|nouvelle interface|changement d'affichage|avant c'était|remettez|redesign|since the update"),
 ("contenu", "Contenu faux ou incomplet (base de données, scan, valeurs)", "plainte", r"base de données|aliments? (introuvable|absent|manquant)|valeurs? (fausses?|erronées?)|scan|code.?barres?|étiquette|wrong (data|values)"),
 ("vie_privee", "Vie privée, autorisations", "plainte", r"vie privée|confidentialit|données personnelles|autorisations?|revend|privacy|tracking"),
 ("notifs", "Notifications envahissantes", "plainte", r"notification|rappels?|\bspam|trop de mails"),
 ("export", "Export, partage, import", "demande", r"export|import|partag|\bpdf\b|\bcsv\b|share"),
 ("plateformes", "Hors ligne, widget, montre, tablette", "demande", r"hors (ligne|connexion)|sans internet|widget|apple watch|montre|tablette|ipad|offline"),
 ("perso", "Personnalisation, mode sombre, réglages", "demande", r"personnalis|mode sombre|thème|réglages?|paramètres?|option pour|dark mode|customi"),
]
DEMANDES = r"j'aimerais|je voudrais|il faudrait|il manque|ce serait (bien|top|génial|pratique)|dommage qu|\bmanque\b|impossible de|pas possible de|on ne peut (pas|même pas)|ajoutez|svp ajout|pourquoi (ne|on ne|ne pas)|\bi wish\b|please add|would love|no way to"
PHRASE = re.compile(r"(?<=[.!?…])\s+|\n+")

def charger_themes(chemin):
    t = [{"id": i, "label": l, "type": k, "re": re.compile(p, re.I)} for i, l, k, p in THEMES]
    if chemin:
        for x in json.load(open(chemin, encoding="utf-8")).get("themes", []):
            t.append({"id": x["id"], "label": x.get("label", x["id"]), "type": x.get("type", "plainte"),
                      "re": re.compile("|".join(x["motifs"]), re.I)})
    return t

def date(s):
    for f, n in (("%Y-%m-%d", 10), ("%Y-%m", 7)):
        try: return dt.datetime.strptime((s or "").strip()[:n], f).date()
        except ValueError: pass

def note(s):
    m = re.match(r"\s*(\d+(?:[.,]\d+)?)", s or "")
    v = float(m.group(1).replace(",", ".")) if m else None
    return v if v is not None and 1 <= v <= 5 else None

def lire(chemin):
    garde, ecartes, doublons, vus = [], 0, 0, set()
    with open(chemin, newline="", encoding="utf-8-sig") as fh:
        for brut in csv.DictReader(fh):
            r = {(k or "").strip().lower(): (v or "").strip() for k, v in brut.items()}
            url, txt = r.get("url", ""), r.get("texte", "")
            if not txt or not re.match(r"^https?://", url):
                ecartes += 1; continue
            cle = re.sub(r"\W+", " ", txt.lower()).strip()
            if cle in vus:
                doublons += 1; continue
            vus.add(cle)
            garde.append({"appli": r.get("appli", ""), "source": r.get("source") or re.sub(r"^https?://(www\.)?([^/]+).*", r"\2", url),
                          "url": url, "date": date(r.get("date")), "note": note(r.get("note")), "texte": txt})
    return garde, ecartes, doublons

def extrait(txt, motif, lim=220):
    for p in PHRASE.split(txt):
        if motif.search(p):
            p = p.strip()
            return p if len(p) <= lim else p[:lim].rstrip() + "…"
    return txt[:lim]

def etoiles(n): return "sans note" if n is None else "%g★" % n

def analyser(avis, themes, mois):
    auj = dt.date.today()
    res = {t["id"]: dict(t, avis=[], score=0.0) for t in themes}
    dem_re, demandes, orphelins = re.compile(DEMANDES, re.I), [], []
    for a in avis:
        w = 0.6 if a["note"] is None else (6 - a["note"]) / 5
        if a["date"] and (auj - a["date"]).days > mois * 30.4: w /= 2
        touche = False
        for t in themes:
            if t["re"].search(a["texte"]):
                touche = True; res[t["id"]]["score"] += w
                res[t["id"]]["avis"].append((a, extrait(a["texte"], t["re"])))
        if dem_re.search(a["texte"]): demandes.append((a, extrait(a["texte"], dem_re)))
        if not touche and a["note"] is not None and a["note"] <= 2: orphelins.append(a)
    classes = []
    for r in res.values():
        if not r["avis"]: continue
        srcs = {a["source"] for a, _ in r["avis"]}
        r["avis"].sort(key=lambda x: (x[0]["note"] if x[0]["note"] is not None else 3, len(x[1])))
        r.update(n=len(r["avis"]), sources=len(srcs), fragile=len(r["avis"]) < 3 or len(srcs) < 2)
        classes.append(r)
    classes.sort(key=lambda r: (-r["score"], -r["n"]))
    return classes, demandes, orphelins

def rapport(avis, ecartes, doublons, classes, demandes, orphelins):
    srcs, applis = sorted({a["source"] for a in avis}), sorted({a["appli"] for a in avis if a["appli"]})
    o = ["# Ce que les utilisateurs des concurrents reprochent et réclament", "",
         "%d avis, %d source(s) : %s.%s %d avec une note." % (len(avis), len(srcs), ", ".join(srcs),
         (" Applis : %s." % ", ".join(applis)) if applis else "", sum(a["note"] is not None for a in avis))]
    if ecartes: o.append("%d ligne(s) écartée(s) : pas de lien ou pas de texte." % ecartes)
    if doublons: o.append("%d doublon(s) retiré(s)." % doublons)
    if len(avis) < 30: o += ["", "**Petit échantillon (moins de 30 avis) : ça donne une direction, pas un classement.**"]
    for typ, titre in (("plainte", "Ce qu'ils reprochent"), ("demande", "Ce qu'ils réclament")):
        rows = [r for r in classes if r["type"] == typ]
        o += ["", "## " + titre, ""]
        if not rows: o.append("Rien de détecté : lire les avis à la main."); continue
        o += ["| rang | thème | score | avis | part | sources |", "| --- | --- | --- | --- | --- | --- |"]
        for i, r in enumerate(rows, 1):
            o.append("| %d | %s%s | %.1f | %d | %.0f %% | %d |" % (i, r["label"], " (fragile)" if r["fragile"] else "",
                     r["score"], r["n"], 100 * r["n"] / len(avis), r["sources"]))
        for r in rows[:6]:
            o += ["", "**%s**" % r["label"]]
            o += ['- « %s » (%s%s, %s) %s' % (q, a["appli"] + ", " if a["appli"] else "", a["source"], etoiles(a["note"]), a["url"]) for a, q in r["avis"][:3]]
    if demandes:
        o += ["", "## Demandes, dans leurs mots", ""]
        o += ['- « %s » (%s, %s) %s' % (q, a["source"], etoiles(a["note"]), a["url"]) for a, q in demandes[:25]]
    if orphelins:
        o += ["", "## À lire à la main", "", "Mauvaises notes qui ne rentrent dans aucun thème : souvent la partie la plus utile.", ""]
        o += ['- (%s, %s) %s : « %s »' % (a["source"], etoiles(a["note"]), a["url"], a["texte"][:220]) for a in orphelins[:15]]
    return "\n".join(o) + "\n"

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("csv"); ap.add_argument("--out"); ap.add_argument("--themes"); ap.add_argument("--mois", type=int, default=18)
    a = ap.parse_args()
    avis, ecartes, doublons = lire(a.csv)
    if not avis: sys.exit("avis.py : aucune ligne utilisable (il faut un lien http et le texte de l'avis).")
    txt = rapport(avis, ecartes, doublons, *analyser(avis, charger_themes(a.themes), a.mois))
    if a.out: open(a.out, "w", encoding="utf-8").write(txt); print("écrit :", a.out)
    else: sys.stdout.write(txt)

if __name__ == "__main__":
    main()
