"use strict";
// dbase.js
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ DATA BASE ↓↓↓ */
  let books = [
    {
      id     : "00000",
      author : "А. Тест Тестович",
      name   : "Ідеальна книга",
      genre  : "тестова книга"
    },
    {
      id     : "00001",
      author : "Irina Weber",
      name   : "Lustige Naturwissenschaft",
      genre  : "метод Франка: нім.мова"
    },
    {
      id     : "00002",
      author : "Hanns Heinz Ewers",
      name   : "Die Spinne",
      genre  : "метод Франка: нім.мова"
    },
    {
      id     : "00003",
      author : "Theodor Storm",
      name   : "Immensee",
      genre  : "метод Франка: нім.мова"
    },
    {
      id     : "00004",
      author : "Theodor Storm",
      name   : "Die Regentrude",
      genre  : "метод Франка: нім.мова"
    },
    {
      id     : "00005",
      author : "Joseph Roth",
      name   : "Die Legende vom heiligen Trinker",
      genre  : "метод Франка: нім.мова"
    },
    {
      id     : "00006",
      author : "Ernst Theodor Amadeus Hoffmann",
      name   : "Der Sandmann",
      genre  : "метод Франка: нім.мова"
    },
    {
      id     : "00007",
      author : "Klaus-Peter Wolf",
      name   : "Total wahre Flunkergeschichten. Erzählt von einem rotzfrechen Mädchen",
      genre  : "метод Франка: нім.мова"
    },
    {
      id     : "00008",
      author : "Wilhelm Hauff",
      name   : "Das kalte Herz",
      genre  : "метод Франка: нім.мова"
    },
    {
      id     : "00009",
      author : "Ilya Frank",
      name   : "Dies Leben kömmt mir vor als eine Renne-Bahn. Deutsche Gedichte aus dem 17. Jahrhundert.",
      genre  : "метод Франка: нім.мова"
    },
    {
      id     : "00010",
      author : "Stefan Zweig",
      name   : "Schachnovelle",
      genre  : "метод Франка: нім.мова"
    },
    {
      id     : "00011",
      author : "Jacob und Wilhelm Grimm",
      name   : "Irische Elfenmärchen",
      genre  : "метод Франка: нім.мова"
    },
    {
      id     : "00012",
      author : "Otfried Preußler",
      name   : "Die kleine Hexe",
      genre  : "метод Франка: нім.мова"
    },
    {
      id     : "00013",
      author : "Stefan Zweig",
      name   : "Brief einer Unbekannten",
      genre  : "метод Франка: нім.мова"
    },
    {
      id     : "00014",
      author : "Adelbert von Chamisso",
      name   : "Peter Schlemihls wundersame Geschichte",
      genre  : "метод Франка: нім.мова"
    },
    {
      id     : "00015",
      author : "Wilhelm Hauff",
      name   : "Kalif Storch. Der kleine Muck. Der Zwerg Nase",
      genre  : "метод Франка: нім.мова"
    },
    {
      id     : "00016",
      author : "Franz Kafka",
      name   : "Die Verwandlung",
      genre  : "метод Франка: нім.мова"
    },
    {
      id     : "00017",
      author : "Heinrich Böll",
      name   : "Das Brot der frühen Jahre",
      genre  : "метод Франка: нім.мова"
    },
    {
      id     : "00018",
      author : "Wolfgang Borchert",
      name   : "Draußen vor der Tür",
      genre  : "метод Франка: нім.мова"
    },
    {
      id     : "00019",
      author : "Ludwig Thoma",
      name   : "Lausbubengeschichten",
      genre  : "метод Франка: нім.мова"
    },
    {
      id     : "00020",
      author : "Ludwig Thoma",
      name   : "Tante Frieda",
      genre  : "метод Франка: нім.мова"
    },
    {
      id     : "00021",
      author : "Friedrich Durrenmatt",
      name   : "Der Richter und sein Henker",
      genre  : "метод Франка: нім.мова"
    },
    {
      id     : "00022",
      author : "Arthur Schnitzler",
      name   : "Traumnovelle",
      genre  : "метод Франка: нім.мова"
    },
    {
      id     : "00023",
      author : "Erich Kästner",
      name   : "Das doppelte Lottchen",
      genre  : "метод Франка: нім.мова"
    },
    {
      id     : "00024",
      author : "Jacob und Wilhelm Grimm",
      name   : "Grimms Märchen",
      genre  : "метод Франка: нім.мова"
    },
    {
      id     : "00025",
      author : "Irmgard Keun",
      name   : "Das Mädchen, mit dem die Kinder nicht verkehren durften",
      genre  : "метод Франка: нім.мова"
    },
    {
      id     : "00026",
      author : "Hans Fallada",
      name   : "Zwei zarte Lämmchen weiß wie Schnee",
      genre  : "метод Франка: нім.мова"
    },
    {
      id     : "00027",
      author : "noname",
      name   : "Der liebe Augustin (Sagen aus Wien)",
      genre  : "метод Франка: нім.мова"
    },
    {
      id     : "00028",
      author : "Erich Kästner",
      name   : "Emil und die Detektive",
      genre  : "метод Франка: нім.мова"
    },
    {
      id     : "00029",
      author : "Friedrich Glauser",
      name   : "Beichte in der Nacht. Erzählungen",
      genre  : "метод Франка: нім.мова"
    },
    {
      id     : "00030",
      author : "Gerhard Holtz-Baumert",
      name   : "Alfons Zitterbacke. Geschichten eines Pechvogels",
      genre  : "метод Франка: нім.мова"
    },
    {
      id     : "00031",
      author : "Joseph Roth",
      name   : "Hotel Savoy",
      genre  : "метод Франка: нім.мова"
    },
    {
      id     : "00032",
      author : "Erich Kästner",
      name   : "Drei Männer im Schnee",
      genre  : "метод Франка: нім.мова"
    },
    {
      id     : "00033",
      author : "Annemarie Selinko",
      name   : "Heute heiratet mein Mann",
      genre  : "метод Франка: нім.мова"
    },
    {
      id     : "00034",
      author : "Hansjorg Martin",
      name   : "Meine schone Morderin",
      genre  : "метод Франка: нім.мова"
    },
    {
      id     : "00035",
      author : "Otfried Preußler",
      name   : "Krabat",
      genre  : "метод Франка: нім.мова"
    },
    {
      id     : "00036",
      author : "Ilya Frank",
      name   : "Wandrers Nachtlied",
      genre  : "метод Франка: нім.мова"
    },
    {
      id     : "00037",
      author : "Erich Maria Remarque",
      name   : "Drei Kameraden",
      genre  : "метод Франка: нім.мова"
    },
    {
      id     : "00038",
      author : "Макаров Н.А., Антонов Г.В.",
      name   : "Психологическая самоподкоговка к рукопашному бою",
      genre  : "Психологія"
    },
    {
      id     : "00039",
      author : "Тарас А.Е.",
      name   : "Психологическая подготовка бойца",
      genre  : "Психологія"
    },
    {
      id     : "00040",
      author : "Сашко А.",
      name   : "Боль",
      genre  : "Психологія"
    },
    {
      id     : "00041",
      author : "Adolf Hitler",
      name   : "Mein Kampf",
      genre  : "ідеологія"
    },
    {
      id     : "00042",
      author : "Йооп Сгрийверс",
      name   : "Как быть крысой. Искусство интриг и выживания на работе",
      genre  : "Психологія"
    },
    {
      id     : "00043",
      author : "Ігнатій Лойола",
      name   : "Духовні вправи",
      genre  : "Психологія"
    },
    {
      id     : "00044",
      author : "Іваничук Роман",
      name   : "Орда",
      genre  : "Укр.література"
    },
    {
      id     : "00045",
      author : "Форсайт Фредерик",
      name   : "День Шакала",
      genre  : "політичний детектив"
    },
    {
      id     : "00046",
      author : "waldteufel",
      name   : "Англійська фонетика",
      genre  : "англійська граматика"
    },
    {
      id     : "00047",
      author : "William Somerset Maugham",
      name   : "German Harry",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00048",
      author : "William Somerset Maugham",
      name   : "Mr. Know-All",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00049",
      author : "Ernest Hemingway",
      name   : "The Killers",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00050",
      author : "Bret Harte",
      name   : "The Stolen Cigar Case",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00051",
      author : "Ray Bradbury",
      name   : "A Sound of Thunder",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00052",
      author : "Stephen King",
      name   : "Strawberry Spring",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00053",
      author : "Bret Harte",
      name   : "Stories Three",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00054",
      author : "Stephen King",
      name   : "Luckey Quarter",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00055",
      author : "William Somerset Maugham",
      name   : "The three fat women of Antibes",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00056",
      author : "Washington Irving",
      name   : "Rip Van Winkle",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00057",
      author : "Stephen King",
      name   : "The Cat from Hell",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00058",
      author : "Ernest Thompson Seton",
      name   : "Lobo, the King of Currumpaw",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00059",
      author : "William Somerset Maugham",
      name   : "The Lotus Eater",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00060",
      author : "Ernest Thompson Seton",
      name   : "Vixen, the Springfield Fox",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00061",
      author : "Mabel G. Taggart",
      name   : "The story of the three goblins",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00062",
      author : "John Keats",
      name   : "Beauty that must die (Selected Poems)",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00063",
      author : "William Somerset Maugham",
      name   : "Red",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00064",
      author : "Ernest Thompson Seton",
      name   : "Raggylug. The Story of a Cottontail Rabbit",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00065",
      author : "Edgar Allan Poe",
      name   : "The purloined letter",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00066",
      author : "Francis Scott Fitzgerald",
      name   : "On schedule",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00067",
      author : "Howard Phillips Lovecraft",
      name   : "The Rats In The Walls",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00068",
      author : "Ernest Hemingway",
      name   : "The Snows of Kilimanjaro",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00069",
      author : "William Somerset Maugham",
      name   : "A Man with a Conscience",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00070",
      author : "William Somerset Maugham",
      name   : "Jane",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00071",
      author : "Robert Louis Stevenson",
      name   : "The Isle of Voices",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00072",
      author : "Stephen King",
      name   : "The end of the whole mess",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00073",
      author : "Francis Scott Fitzgerald",
      name   : "The Curious Case Of Benjamen Button",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00074",
      author : "John Ruskin",
      name   : "The King of the Golden River",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00075",
      author : "Francis Scott Fitzgerald",
      name   : "The Camel’s Back",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00076",
      author : "noname",
      name   : "Robin Hood",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00077",
      author : "Stephen Leacock",
      name   : "Nonsense Novels",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00078",
      author : "Stephen King",
      name   : "Sometimes they come back",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00079",
      author : "Joseph Conrad",
      name   : "An outpost of progress",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00080",
      author : "Cyrus Mac Millan",
      name   : "Canadian Wonder Tales",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00081",
      author : "Oscar Wilde",
      name   : "The Canterville Ghost",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00082",
      author : "William Somerset Maugham",
      name   : "The Outstation",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00083",
      author : "Stephen King",
      name   : "Children of the Corn",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00084",
      author : "William Somerset Maugham",
      name   : "The Fall of Edward Barnard",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00085",
      author : "William Butler Yeats",
      name   : "Stories Of Red Hanrahan",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00086",
      author : "Arthur Conan Doyle",
      name   : "The Adventure of the Priory School",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00087",
      author : "O’Henry",
      name   : "The Octopus Marooned",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00088",
      author : "John William Smith",
      name   : "Twist-ending Stories",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00089",
      author : "Howard Phillips Lovecraft",
      name   : "The Call Of Cthulhu",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00090",
      author : "Ernest Thompson Seton",
      name   : "The Slum Cat",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00091",
      author : "noname",
      name   : "Beowulf For Children",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00092",
      author : "Robert Louis Stevenson",
      name   : "The Bottle Imp",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00093",
      author : "Stephen King",
      name   : "The Monkey",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00094",
      author : "Francis Scott Fitzgerald",
      name   : "Pat Hobby's Secret And Other Stories",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00095",
      author : "noname",
      name   : "William Tell",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00096",
      author : "Edward Lear",
      name   : "A Book of Nonsense",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00097",
      author : "Ernest Thompson Seton",
      name   : "Tito. The Story of the Coyote That Learned How",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00098",
      author : "Virginia Woolf",
      name   : "A Haunted House and other stories",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00099",
      author : "Jerome Klapka Jerome",
      name   : "Stories",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00100",
      author : "Stephen King",
      name   : "Riding the Bullet",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00101",
      author : "Oscar Wilde",
      name   : "Lord Arthur Savile’s crime and other stories",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00102",
      author : "Edgar Allan Poe",
      name   : "The Murders In The Rue Morgue",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00103",
      author : "Bret Harte",
      name   : "Miss Peggy’s Proteges and Other Stories",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00104",
      author : "John William Smith",
      name   : "Too Good To Be True And Other Stories",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00105",
      author : "James Joyce",
      name   : "The Dead",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00106",
      author : "John William Smith",
      name   : "Scary Stories",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00107",
      author : "Stephen King",
      name   : "The Night Flier",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00108",
      author : "Oscar Wilde",
      name   : "The Happy Prince And Other Tales",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00109",
      author : "noname",
      name   : "North American Indian Legends",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00110",
      author : "Herman Melville",
      name   : "Bartleby, The Scrivener",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00111",
      author : "Edgar Allan Poe",
      name   : "The Fall of the House of Usher And Other Stories",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00112",
      author : "Robert Louis Stevenson",
      name   : "The Pavilion On The Links",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00113",
      author : "Francis Scott Fitzgerald",
      name   : "The Popular Girl",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00114",
      author : "Graham Greene",
      name   : "No Man's Land",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00115",
      author : "Arthur Conan Doyle",
      name   : "Tales Of Pirates",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00116",
      author : "Stephen King",
      name   : "Dolan's Cadillac",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00117",
      author : "noname",
      name   : "Sir Gawain and the Green Knight",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00118",
      author : "Mark Twain",
      name   : "The Million Pound Bank Note and other stories",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00119",
      author : "Francis Scott Fitzgerald",
      name   : "The diamond as big as the Ritz",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00120",
      author : "Brian Doherty",
      name   : "The Story Of Pocahontas",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00121",
      author : "Theodore Dreiser",
      name   : "Will You Walk Into My Parlor?",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00122",
      author : "David Herbert Lawrence",
      name   : "The Shadow in the Rose Garden and Other Stories",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00123",
      author : "John William Smith",
      name   : "Longer Wacky Stories With Twist Endings",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00124",
      author : "William Wymark Jacobs",
      name   : "A Love Passage and Other Stories",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00125",
      author : "Bram Stoker",
      name   : "Dracula's Guest and Other Weird Stories",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00126",
      author : "Ernest Hemingway",
      name   : "The Old Man And The Sea",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00127",
      author : "Wilkie Collins",
      name   : "The Dream Woman",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00128",
      author : "Oscar Wilde",
      name   : "The Importance of Being Earnest. A Trivial Comedy for Serious People",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00129",
      author : "Thomas Hardy",
      name   : "The Distracted Preacher",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00130",
      author : "Jonathan Swift",
      name   : "Gulliver's Travels",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00131",
      author : "Henry James",
      name   : "Daisy Miller",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00132",
      author : "Alexander Alan Milne",
      name   : "Winnie-the-Pooh",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00133",
      author : "Alexander Alan Milne",
      name   : "The House at Pooh Corner",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00134",
      author : "Arthur Conan Doyle",
      name   : "Silver Blaze",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00135",
      author : "Robert Louis Stevenson",
      name   : "The Suicide Club",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00136",
      author : "Francis Scott Fitzgerald",
      name   : "Jacob's Ladder and Other Stories",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00137",
      author : "Walter Scott",
      name   : "Ivanhoe",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00138",
      author : "Saki",
      name   : "Shock Tactics And Other Stories",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00139",
      author : "Robert Louis Stevenson",
      name   : "The Rajah's Diamond",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00140",
      author : "Graham Greene",
      name   : "The Third Man",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00141",
      author : "John Steinbeck",
      name   : "Of Mice And Men",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00142",
      author : "Robert Louis Stevenson",
      name   : "The strange case of dr. Jekyll and mr. Hyde",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00143",
      author : "Jane Austen",
      name   : "Lady Susan",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00144",
      author : "Oscar Wilde",
      name   : "The Star-Child And Other Legends",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00145",
      author : "John William Smith",
      name   : "More Longer Wacky Stories With Twist Endings",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00146",
      author : "George Bernard Shaw",
      name   : "Pygmalion",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00147",
      author : "Walter Brandon Thomas",
      name   : "Charley's Aunt",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00148",
      author : "Jack London",
      name   : "All Gold Canyon (Stories)",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00149",
      author : "noname",
      name   : "Japanese Tales",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00150",
      author : "Jack London",
      name   : "In A Far Country (Stories)",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00151",
      author : "Sherwood Anderson",
      name   : "Winesburg, Ohio",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00152",
      author : "James Baldwin",
      name   : "Robinson Crusoe Written Anew for Children by James Baldwin",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00153",
      author : "Lewis Carroll",
      name   : "Through The Looking-Glass",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00154",
      author : "Jack London",
      name   : "South Sea Tales",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00155",
      author : "Charles Dickens",
      name   : "A Christmas Carol",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00156",
      author : "Herbert George Wells",
      name   : "The Time Machine",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00157",
      author : "Lewis Carroll",
      name   : "Alice's adventures in Wonderland",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00158",
      author : "Robert Louis Stevenson",
      name   : "The Beach of Falesá (Island Nights' Entertainments)",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00159",
      author : "Paul Gallico",
      name   : "Mrs. ‘Arris Goes to Paris",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00160",
      author : "O’Henry",
      name   : "Stories",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00161",
      author : "Cyrus Mac Millan",
      name   : "Indian Wonder Tales",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00162",
      author : "Gilbert Keith Chesterton",
      name   : "The Innocence of Father Brown",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00163",
      author : "John Buchan",
      name   : "The Thirty-Nine Steps",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00164",
      author : "Rudyard Kipling",
      name   : "Just So Stories",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00165",
      author : "Herbert George Wells",
      name   : "Short Stories",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00166",
      author : "Jack London",
      name   : "The Call Of The Wild",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00167",
      author : "Pamela Lyndon Travers",
      name   : "Mary Poppins",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00168",
      author : "Lyman Frank Baum",
      name   : "The Wonderful Wizard Of Oz",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00169",
      author : "Lyman Frank Baum",
      name   : "The Marvelous Land Of Oz",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00170",
      author : "Graham Greene",
      name   : "The Tenth Man",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00171",
      author : "Arthur Conan Doyle",
      name   : "The Adventures Of Gerard",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00172",
      author : "Joseph Jacobs",
      name   : "English Fairy Tales",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00173",
      author : "Andrew Lang",
      name   : "King Arthur. Tales of the Round Table.",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00174",
      author : "Arthur Conan Doyle",
      name   : "A Study In Scarlet",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00175",
      author : "Arthur Conan Doyle",
      name   : "The Sign Of The Four",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00176",
      author : "noname",
      name   : "Irish Fairy Tales",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00177",
      author : "noname",
      name   : "Great Ghost Stories",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00178",
      author : "Pelham Grenville Wodehouse",
      name   : "Stories",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00179",
      author : "Jean Webster",
      name   : "Daddy-Long-Legs",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00180",
      author : "Dashiell Hammett",
      name   : "The adventures of Sam Spade",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00181",
      author : "William Somerset Maugham",
      name   : "Ashenden. The British Agent",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00182",
      author : "noname",
      name   : "Grimm Stories",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00183",
      author : "Robert Ervin Howard",
      name   : "Conan",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00184",
      author : "Jack London",
      name   : "Stories",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00185",
      author : "Robert Ervin Howard",
      name   : "Stories",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00186",
      author : "Herbert George Wells",
      name   : "The Invisible Man",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00187",
      author : "James Matthew Barrie",
      name   : "Peter Pan",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00188",
      author : "Thornton Waldo Burgess",
      name   : "Peter Rabbit",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00189",
      author : "Howard Phillips Lovecraft",
      name   : "At The Mountains Of Madness",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00190",
      author : "Anthony Hope",
      name   : "The Prisoner Of Zenda",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00191",
      author : "Arthur Conan Doyle",
      name   : "The Hound of the Baskervilles",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00192",
      author : "Kenneth Grahame",
      name   : "The Wind in the Willows",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00193",
      author : "Michael Moorcock",
      name   : "The Knight of the Swords",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00194",
      author : "Rudyard Kipling",
      name   : "The Jungle Book",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00195",
      author : "Francis Scott Fitzgerald",
      name   : "The Great Gatsby",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00196",
      author : "Herbert George Wells",
      name   : "The War of the Worlds",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00197",
      author : "Joseph Sheridan Le Fanu",
      name   : "The Room in the Dragon Volant",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00198",
      author : "Octavus Roy Cohen",
      name   : "Midnight",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00199",
      author : "Graham Greene",
      name   : "A Gun for Sale",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00200",
      author : "Jerome Klapka Jerome",
      name   : "Three Men In A Boat",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00201",
      author : "Agatha Christie",
      name   : "The ABC Murders",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00202",
      author : "Robert Louis Stevenson",
      name   : "Treasure Island",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00203",
      author : "Mario Puzo",
      name   : "Godfather",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00204",
      author : "Edgar Rice Burroughs",
      name   : "A Princess Of Mars",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00205",
      author : "Mark Twain",
      name   : "The Prince and the Pauper",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00206",
      author : "Dorothy Leigh Sayers",
      name   : "Whose Body?",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00207",
      author : "Dashiell Hammett",
      name   : "The Maltese Falcon",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00208",
      author : "Mark Twain",
      name   : "The Adventures of Tom Sawyer",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00209",
      author : "Robert Louis Stevenson",
      name   : "The Black Arrow",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00210",
      author : "Agatha Christie",
      name   : "Murder On The Orient Express",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00211",
      author : "William Somerset Maugham",
      name   : "Theatre",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00212",
      author : "John Ronald Reuel Tolkien",
      name   : "The Hobbit",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00213",
      author : "Henry Rider Haggard",
      name   : "King Solomon's Mines",
      genre  : "метод Франка: англ.мова"
    },
    {
      id     : "00214",
      author : "Arthur Conan Doyle",
      name   : "Stories",
      genre  : "метод Франка: англ.мова"
    }
  ];
/* ↑↑↑ /DATA BASE ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////