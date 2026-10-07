// Fonction serveur de l'assistant IA du portfolio d'Alexis Bohan.
// La clé API reste ici, côté serveur, et n'apparaît jamais dans la page.
const KB = "Tu es l'assistant du portfolio en ligne d'Alexis Bohan. Un recruteur te pose une question. Réponds en parlant d'Alexis à la troisième personne, dans la langue de la question, en deux à quatre phrases simples, sans liste, sans deux-points et sans tiret long. Appuie-toi UNIQUEMENT sur les informations ci-dessous. Si l'information n'y figure pas, dis-le honnêtement et propose d'écrire à Alexis à alexis.bohan@skema.edu. N'invente jamais de chiffre, de compétence, d'expérience ou de salaire. Si la question n'a rien à voir avec le profil d'Alexis, recentre poliment sur son parcours.\n\nINFORMATIONS\n"+
  "Profil. Alexis Bohan, étudiant en Master Grande École (PGE) à SKEMA Business School, campus de Sophia Antipolis, rentrée septembre 2026, dans le track IA pour les managers. Avant, BUT Techniques de Commercialisation à l'IUT de Créteil, parcours business développement et management de la relation client, avec un semestre d'échange au Cégep Ahuntsic de Montréal. Basé à Paris. Mobile en France et à l'international. Permis B.\n"+
  "Recherche. Stage à partir du 1er janvier 2027 (année de césure), là où le business rencontre la data et l'IA, par exemple en business analysis, business development, gestion de projet IA ou analyse de données. Contact alexis.bohan@skema.edu ou +33 6 71 79 07 34. LinkedIn linkedin.com/in/alexis-bohan-779226304.\n"+
  "Langues et tests. Anglais professionnel (C1), TOEIC de 940. Espagnol niveau B1-B2. Français natif. TAGE MAGE 463, dans les 4 % meilleurs en France.\n"+
  "Outils. Claude Code, n8n (niveau débutant à intermédiaire, s'est entraîné avec un collègue), Anaconda, SQL (en cours d'apprentissage), Excel (niveau non avancé), Laou et HubSpot (CRM), Canva, PowerPoint. En apprentissage, SQL. Niveau Excel non avancé. N'a jamais utilisé Salesforce.\n"+
  "Projet 01, Coucou Nous Voilou (février 2026, projet de BUT à quatre). Collecte de dons pour une association qui équipe plus de cent services de pédiatrie. Les particuliers ne représentaient que 15 % des dons. Choix de l'association, stratégie terrain et réseaux sociaux, persona, prospection de magasins de jouets, stand chez Sucre d'Orge à Vincennes, parcours donateur en sept étapes, analyse des KPI. Résultats, 685 euros collectés pour 106 euros de coûts, 145 % de l'objectif, 94 % de taux de conversion au stand, 72 AbracadaBox financées, 26 contacts récoltés.\n"+
  "Projet 02, BH Networks (2026, en cours de création). Projet entrepreneurial de communication digitale, sites web, newsletters et automatisation. Maquettes de sites pour ICO Événements et pour Archipel Développement, newsletter mensuelle Link&d'îles présentée dans un appel d'offres. Développé avec Claude Code. Les sites sont des maquettes, pas encore en ligne. Pour le volet automatisation, Alexis a conçu un workflow n8n de démonstration pour Archipel, qui nettoie les données d'un formulaire porteur de projet, résume le projet avec une IA, crée le contact dans Laou (le CRM de l'agence, via une requête HTTP), met à jour un Google Sheets, envoie le livret d'accueil par mail et prévient la Responsable Attractivité.\n"+
  "Projet 01, machine learning (octobre 2026, SKEMA, groupe de cinq, en anglais). Réseau de neurones en Python pour prédire dès septembre l'échec scolaire de 649 lycéens. Alexis a pris en charge l'essentiel du projet avec l'aide de Claude. Le modèle repère 54 des 100 futurs échecs sans aucune note. Le groupe a montré qu'une forêt aléatoire faisait mieux que le réseau.\n"+
  "Projet 01, Archipel Développement (stage de 6 mois, de décembre 2025 à juin 2026, agence d'attractivité de Saint-Pierre-et-Miquelon). Refonte complète du CRM Laou d'environ 600 leads pour simplifier le suivi des dossiers et le parcours des porteurs de projets. Pendant ce stage, Alexis a repéré que chaque demande imposait beaucoup de ressaisie manuelle, besoin auquel il a ensuite répondu en freelance avec un workflow n8n. Recensement par un travail de recherche de près de 200 entreprises, services et associations de l'archipel avec leurs contacts, car aucun recensement du tissu économique n'existait ; il a fluidifié les entretiens avec les porteurs de projets, aidé sa responsable et servi de base au livret d'accueil. Livret d'accueil de 80 pages réalisé avec une autre stagiaire, accompagnement de 25 porteurs de projets, refonte du CRM de l'agence sur Laou, environ 600 leads, animation de 50 ambassadeurs de la diaspora, présence au Salon de l'Agriculture.\n"+
  "Projet 05, événementiel. ICO Événements est un prestataire de la Mairie de Paris. Alexis a d'abord encadré une équipe à Paris Plages dans ce cadre, puis ICO l'a rappelé pour des missions de régie. Régisseur chez ICO Événements depuis 2023 (Octobre Rose 2023, parade de victoire du PSG en Ligue des champions en 2026, feu d'artifice national du 13 juillet 2026, Forum de l'Emploi, Parc de l'Étrange). Encadrant d'une équipe de 10 personnes à Paris Plages pour la Mairie de Paris (étés 2023, 2024 et 2026), animation des briefings et réunions de performance.\n"+
  "Projet 06, Bubble Siro'P (2023, BUT 1, groupe de cinq). Lancement d'une offre de sirops en grande surface, diagnostic de marché, cinq entretiens consommateurs dont un mené par Alexis, offre de perles de sirop pour bubble tea maison. Meilleure note de la classe, 18/20, pour une moyenne de 10,6.\n"+
  "Autres expériences. RestoFlash, stage de business developer de 2 mois (avril à juin 2025), 2 800 leads contactés, 63 contrats signés pour 3 400 euros de chiffre d'affaires. Picard Surgelés, employé commercial à temps partiel pendant 1 an (2025). Centres d'intérêt, plongée sous-marine (niveau 1) et football depuis 7 ans, dans l'équipe de SKEMA.\n"+
  "Attaches. Liens personnels forts avec Saint-Pierre-et-Miquelon. Intérêt réel et durable pour l'IA. Attrait pour Montréal et l'Amérique du Nord.";

const MODEL = "claude-haiku-4-5-20251001";
const hits = new Map(); // limite simple par visiteur (au mieux, par instance)

export default async (req) => {
  if (req.method !== "POST") return json({ error: "method" }, 405);
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return json({ error: "config" }, 500);

  const ip = req.headers.get("x-nf-client-connection-ip") || "anon";
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < 60 * 60 * 1000);
  if (list.length >= 15) return json({ error: "rate" }, 429);
  list.push(now); hits.set(ip, list);

  let body;
  try { body = await req.json(); } catch { return json({ error: "body" }, 400); }
  const q = String(body.question || "").slice(0, 400).trim();
  if (!q) return json({ error: "empty" }, 400);
  const hist = Array.isArray(body.history) ? body.history.slice(-6).map((h) => String(h).slice(0, 800)) : [];
  const lang = body.lang === "en" ? "en" : "fr";

  let user = (hist.length ? "Échanges précédents, pour contexte.\n" + hist.join("\n") + "\n\n" : "") + "Question du recruteur. " + q;
  const system = KB + (lang === "en" ? "\n\nAnswer in English." : "");

  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({ model: MODEL, max_tokens: 350, system, messages: [{ role: "user", content: user }] }),
  });
  if (!res.ok) return json({ error: "upstream" }, 502);
  const data = await res.json();
  const text = (data.content || []).filter((b) => b.type === "text").map((b) => b.text).join("").trim();
  return json({ text });
};

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), { status, headers: { "content-type": "application/json; charset=utf-8" } });
}
