// Replace these placeholder projects with your own work.
// `category` must match one of the filters in src/components/Portfolio.tsx
export const projectCategories = [
  "All",
  "Science",
  "Health",
  "Education",
  "Social Science",
  "Business",
];

export const projects = [
  {
  id: "aiyetoro-town",
  title: "Semantic and Cultural Analysis of Aiyetoro Town",
  field: "Linguistics",
  type: "Undergraduate Project",
  category: "Arts and Humanities",
  year: "2025",
  tags: [
    "Semantics",
    "Cultural Analysis",
    "Yoruba Language",
    "Nigerian Cinema"
  ],
  accent: "teal",
  summary:
    "A qualitative study of language, cultural identity, social relationships, and cinematic representation in Funke Akindele's Aiyetoro Town.",

  overview:
    "The project examined the semantic and cultural dimensions of Aiyetoro Town, a Nigerian comedy series created by Funke Akindele. It explored how language, characterization, social relationships, cultural practices, and cinematic techniques contribute to the construction of meaning. Particular attention was given to Yoruba expressions, cultural identity, humour, traditional authority, community relationships, and the relationship between modernization and cultural preservation.",

  objectives: [
    "Examine the semantic meanings of selected linguistic expressions used in Aiyetoro Town",
    "Investigate how language use reflects cultural identity and social relationships among the characters",
    "Analyse the representation of traditional values, leadership, community life, and modernization in the series",
    "Examine how characterization, setting, costumes, props, and other cinematic techniques contribute to cultural meaning",
    "Determine how humour and interpersonal interactions communicate social attitudes and cultural expectations"
  ],

  methodology:
    "The study adopted a qualitative research design using content analysis. Selected scenes were closely observed and analysed, focusing on linguistic expressions, character interactions, cultural practices, and visual representations. Data were examined through dialogue, language choice, characterization, setting, costumes, props, gestures, facial expressions, and other cinematic elements. The analysis was descriptive and interpretative, considering the semantic meanings of expressions and their cultural contexts. Relevant scholarly literature on semantics, language and culture, Nigerian cinema, and indigenous-language representation provided additional theoretical context.",

  keyAreas: [
    "Language and Meaning: Literal meanings, contextual interpretations, Yoruba expressions, humour, and culturally significant forms of address",
    "Cultural Identity: Representation of Yoruba identity, indigenous practices, and Nigerian sociocultural realities",
    "Traditional Leadership and Social Hierarchy: The Baale, traditional council, respect for authority, and leadership expectations",
    "Family and Community Relationships: Family ties, friendships, neighbourhood interactions, and communal expectations",
    "Tradition and Modernity: Community transformation, development, and cultural preservation",
    "Characterization and Humour: Character behaviour, speech patterns, relationships, and humour as social commentary",
    "Visual and Cinematic Representation: Setting, costumes, props, gestures, facial expressions, camera framing, editing, and sound",
    "Semantics and Cultural Context: The relationship between linguistic meaning, social context, and cultural interpretation"
  ],

  deliverables: [
    "Five-chapter undergraduate project document",
    "Qualitative analysis of selected scenes and linguistic expressions",
    "Thematic discussion of semantic and cultural representations",
    "Reference list in departmental style",
    "Project defence presentation slides"
  ],
},

];

export type Project = (typeof projects)[number];
