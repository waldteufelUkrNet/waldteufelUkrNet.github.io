"use strict";
// dbase.js
////////////////////////////////////////////////////////////////////////////////
/* ↓↓↓ DATA BASE ↓↓↓ */
  let books = [
    {
      id     : '00000',
      author : 'А. Тест Тестович',
      name   : 'Ідеальна книга',
      genre  : 'тестова книга'
    },
    {
      id     : '00001',
      author : 'Irina Weber',
      name   : 'Lustige Naturwissenschaft', // 42
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00002',
      author : 'Hanns Heinz Ewers',
      name   : 'Die Spinne', // 46
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00003',
      author : 'Theodor Storm',
      name   : 'Immensee', // 55
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00004',
      author : 'Theodor Storm',
      name   : 'Die Regentrude', // 57
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00005',
      author : 'Joseph Roth',
      name   : 'Die Legende vom heiligen Trinker', // 61
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00006',
      author : 'E.T.A. Hoffmann',
      name   : 'Der Sandmann', // 71
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00007',
      author : 'Klaus-Peter Wolf',
      name   : 'Total wahre Flunkergeschichten. Erzählt von einem rotzfrechen Mädchen', // 77
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00008',
      author : 'Wilhelm Hauff',
      name   : 'Das kalte Herz', // 79
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00009',
      author : 'I.Frank',
      name   : 'Dies Leben kömmt mir vor als eine Renne-Bahn. Deutsche Gedichte aus dem 17. Jahrhundert.', // 80
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00010',
      author : 'Stefan Zweig',
      name   : 'Schachnovelle', //89
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00011',
      author : 'Jacob und Wilhelm Grimm',
      name   : 'Irische Elfenmärchen', // 92
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00012',
      author : 'Otfried Preußler',
      name   : 'Die kleine Hexe', // 94
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00013',
      author : 'Stefan Zweig',
      name   : 'Brief einer Unbekannten', // 96
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00014',
      author : 'Adelbert von Chamisso',
      name   : 'Peter Schlemihls wundersame Geschichte', // 104
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00015',
      author : 'Wilhelm Hauff',
      name   : 'Kalif Storch. Der kleine Muck. Der Zwerg Nase', // 109
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00016',
      author : 'Franz Kafka',
      name   : 'Die Verwandlung', // 112
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00017',
      author : 'Heinrich Böll',
      name   : 'Das Brot der frühen Jahre', // 113
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00018',
      author : 'Wolfgang Borchert',
      name   : 'Draußen vor der Tür', // 121
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00019',
      author : 'Ludwig Thoma',
      name   : 'Lausbubengeschichten', // 129
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00020',
      author : 'Ludwig Thoma',
      name   : 'Tante Frieda', // 143
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00021',
      author : 'Friedrich Durrenmatt',
      name   : 'Der Richter und sein Henker', // 141
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00022',
      author : 'Arthur Schnitzler',
      name   : 'Traumnovelle', // 150
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00023',
      author : 'Erich Kästner',
      name   : 'Das doppelte Lottchen', // 154
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00024',
      author : 'Jacob und Wilhelm Grimm',
      name   : 'Grimms Märchen', // 154
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00025',
      author : 'Irmgard Keun',
      name   : 'Das Mädchen, mit dem die Kinder nicht verkehren durften', // 154
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00026',
      author : 'Hans Fallada',
      name   : 'Zwei zarte Lämmchen weiß wie Schnee', // 162
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00027',
      author : 'noname',
      name   : 'Der liebe Augustin (Sagen aus Wien)', // 165
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00028',
      author : 'Erich Kästner',
      name   : 'Emil und die Detektive', // 171
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00029',
      author : 'Friedrich Glauser',
      name   : 'Beichte in der Nacht. Erzählungen', // 175
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00030',
      author : 'Gerhard Holtz-Baumert',
      name   : 'Alfons Zitterbacke. Geschichten eines Pechvogels', // 199
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00031',
      author : 'Joseph Roth',
      name   : 'Hotel Savoy', // 201
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00032',
      author : 'Erich Kästner',
      name   : 'Drei Männer im Schnee', // 261
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00033',
      author : 'Annemarie Selinko',
      name   : 'Heute heiratet mein Mann', // 265
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00034',
      author : 'Hansjorg Martin',
      name   : 'Meine schone Morderin', // 271
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00035',
      author : 'Otfried Preußler', // 273
      name   : 'Krabat',
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00036',
      author : 'I.Frank',
      name   : 'Wandrers Nachtlied', // 298
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00037',
      author : 'E. M. Remarque',
      name   : 'Drei Kameraden', // 409
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00038',
      author : 'Макаров Н.А., Антонов Г.В.',
      name   : 'Психологическая самоподкоговка к рукопашному бою',
      genre  : 'Психологія'
    },
    {
      id     : '00039',
      author : 'Тарас А.Е.',
      name   : 'Психологическая подготовка бойца',
      genre  : 'Психологія'
    },
    {
      id     : '00040',
      author : 'Сашко А.',
      name   : 'Боль',
      genre  : 'Психологія'
    },
    {
      id     : '00041',
      author : 'Adolf Hitler',
      name   : 'Mein Kampf',
      genre  : 'ідеологія'
    },
    {
      id     : '00042',
      author : 'Йооп Сгрийверс',
      name   : 'Как быть крысой. Искусство интриг и выживания на работе',
      genre  : 'Психологія'
    },
    {
      id     : '00043',
      author : 'Ігнатій Лойола',
      name   : 'Духовні вправи',
      genre  : 'Психологія'
    },
    {
      id     : '00044',
      author : 'Іваничук Роман',
      name   : 'Орда',
      genre  : 'Укр.література'
    },
    {
      id     : '00045',
      author : 'Форсайт Фредерик',
      name   : 'День Шакала',
      genre  : 'політичний детектив'
    },
    {
      id     : '00046',
      author : 'waldteufel',
      name   : 'Англійська фонетика',
      genre  : 'без жанру'
    },
    {
      id     : '00047',
      author : 'Ernest Hemingway',
      name   : 'The Killers',
      genre  : 'метод Франка: англ.мова'
    },
    {
      id     : '00048',
      author : 'Ray Bradbury',
      name   : 'A Sound of Thunder',
      genre  : 'метод Франка: англ.мова'
    },
    {
      id     : '00049',
      author : 'Washington Irving',
      name   : 'Rip Van Winkle',
      genre  : 'метод Франка: англ.мова'
    },
    {
      id     : '00050',
      author : 'Francis Scott Fitzgerald',
      name   : 'The diamond as big as the Ritz',
      genre  : 'метод Франка: англ.мова'
    },
  ];
/* ↑↑↑ /DATA BASE ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////