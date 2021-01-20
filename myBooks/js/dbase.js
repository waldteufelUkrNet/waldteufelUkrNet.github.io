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
      author : 'Макаров Н.А., Антонов Г.В.',
      name   : 'Психологическая самоподкоговка к рукопашному бою',
      genre  : 'Психологія'
    },
    {
      id     : '00002',
      author : 'Тарас А.Е.',
      name   : 'Психологическая подготовка бойца',
      genre  : 'Психологія'
    },
    {
      id     : '00003',
      author : 'Adolf Hitler',
      name   : 'Mein Kampf',
      genre  : 'genre'
    },
    {
      id     : '00004',
      author : 'Сашко А.',
      name   : 'Боль',
      genre  : 'Психологія'
    },
    {
      id     : '00005',
      author : 'Йооп Сгрийверс',
      name   : 'Как быть крысой. Искусство интриг и выживания на работе',
      genre  : 'Психологія'
    },
    {
      id     : '00006',
      author : 'Ігнатій Лойола',
      name   : 'Духовні вправи',
      genre  : 'Психологія'
    },
    {
      id     : '00007',
      author : 'Irina Weber',
      name   : 'Lustige Naturwissenschaft',
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00008',
      author : 'Ernest Hemingway',
      name   : 'The Killers',
      genre  : 'метод Франка: англ.мова'
    },
    {
      id     : '00009',
      author : 'Іваничук Роман',
      name   : 'Орда',
      genre  : 'Укр.література'
    },
    {
      id     : '00010',
      author : 'Klaus-Peter Wolf',
      name   : 'Total wahre Flunkergeschichten. Erzählt von einem rotzfrechen Mädchen',
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00011',
      author : 'Ray Bradbury',
      name   : 'A Sound of Thunder',
      genre  : 'метод Франка: англ.мова'
    },
    {
      id     : '00012',
      author : 'Washington Irving',
      name   : 'Rip Van Winkle',
      genre  : 'метод Франка: англ.мова'
    },
    {
      id     : '00013',
      author : 'Francis Scott Fitzgerald',
      name   : 'The diamond as big as the Ritz',
      genre  : 'метод Франка: англ.мова'
    },
    {
      id     : '00014',
      author : 'Otfried Preussler',
      name   : 'Die kleine Hexe',
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00015',
      author : 'author',
      name   : 'Англійська фонетика',
      genre  : 'genre'
    },
    {
      id     : '00016',
      author : 'Stefan Zweig',
      name   : 'Schachnovelle',
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00017',
      author : 'Форсайт Фредерик',
      name   : 'День Шакала',
      genre  : 'політичний детектив'
    },
    {
      id     : '00018',
      author : 'Heinrich Böll',
      name   : 'Das Brot der frühen Jahre',
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00019',
      author : 'Friedrich Durrenmatt',
      name   : 'Der Richter und sein Henker',
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00020',
      author : 'Erich Kästner',
      name   : 'Das doppelte Lottchen',
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00021',
      author : 'Erich Kästner',
      name   : 'Drei Männer im Schnee',
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00022',
      author : 'Hansjorg Martin',
      name   : 'Meine schone Morderin',
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00023',
      author : 'Annemarie Selinko',
      name   : 'Heute heiratet mein Mann',
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00024',
      author : 'E. M. Remarque',
      name   : 'Drei Kameraden',
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00025',
      author : 'Hanns Heinz Ewers',
      name   : 'Die Spinne',
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00026',
      author : 'Joseph Roth',
      name   : 'Die Legende vom heiligen Trinker',
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00027',
      author : 'Wilhelm Hauff',
      name   : 'Das kalte Herz',
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00028',
      author : 'Franz Kafka',
      name   : 'Die Verwandlung',
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00029',
      author : 'Theodor Storm',
      name   : 'Die Regentrude',
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00030',
      author : 'Theodor Storm',
      name   : 'Immensee',
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00031',
      author : 'Hans Fallada',
      name   : 'Zwei zarte Lämmchen weiß wie Schnee',
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00032',
      author : 'Stefan Zweig',
      name   : 'Brief einer Unbekannten',
      genre  : 'метод Франка: нім.мова'
    },
    {
      id     : '00033',
      author : 'Ludwig Thoma',
      name   : 'Lausbubengeschichten',
      genre  : 'метод Франка: нім.мова'
    }
  ];
/* ↑↑↑ /DATA BASE ↑↑↑ */
////////////////////////////////////////////////////////////////////////////////