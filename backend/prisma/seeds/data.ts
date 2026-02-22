const mkBoard = {
  name: "Mortal Kombat",
  image:
    "https://res.cloudinary.com/dwyzndpyq/image/upload/v1771678732/mk-game_xonw3n.jpg",
};

const mkCharacters = [
  {
    name: "Sub-Zero",
    area: { x1: 52.772, y1: 52.475, x2: 57.29, y2: 56.906 },
    image:
      "https://res.cloudinary.com/dwyzndpyq/image/upload/v1771686430/01_qpg6sf.png",
  },
  {
    name: "Scorpion",
    area: { x1: 35.779, y1: 53.741, x2: 40.511, y2: 58.402 },
    image:
      "https://res.cloudinary.com/dwyzndpyq/image/upload/v1771686429/02_uk2wza.png",
  },
  {
    name: "Noob Saibot",
    area: { x1: 77.51, y1: 32.087, x2: 81.883, y2: 36.92 },
    image:
      "https://res.cloudinary.com/dwyzndpyq/image/upload/v1771686429/03_n93kga.png",
  },
  {
    name: "Smoke",
    area: { x1: 40.081, y1: 79.633, x2: 42.734, y2: 82.222 },
    image:
      "https://res.cloudinary.com/dwyzndpyq/image/upload/v1771686427/04_ftofxb.png",
  },
  {
    name: "Kitana",
    area: { x1: 69.336, y1: 37.055, x2: 72.49, y2: 41.428 },
    image:
      "https://res.cloudinary.com/dwyzndpyq/image/upload/v1771686427/05_eokooo.png",
  },
  {
    name: "Mileena",
    area: { x1: 3.227, y1: 71.002, x2: 6.166, y2: 75.893 },
    image:
      "https://res.cloudinary.com/dwyzndpyq/image/upload/v1771686426/06_mmgaub.png",
  },
  {
    name: "Liu Kang",
    area: { x1: 3.657, y1: 15.152, x2: 6.74, y2: 19.87 },
    image:
      "https://res.cloudinary.com/dwyzndpyq/image/upload/v1771686426/07_ze64ve.png",
  },
  {
    name: "Reptile",
    area: { x1: 30.473, y1: 48.236, x2: 32.768, y2: 51.746 },
    image:
      "https://res.cloudinary.com/dwyzndpyq/image/upload/v1771686424/08_upvrlj.png",
  },
  {
    name: "Johnny Cage",
    area: { x1: 29.111, y1: 22.325, x2: 30.76, y2: 24.569 },
    image:
      "https://res.cloudinary.com/dwyzndpyq/image/upload/v1771686424/09_qihbe3.png",
  },
  {
    name: "Ermac",
    area: { x1: 68.117, y1: 42.003, x2: 71.989, y2: 45.225 },
    image:
      "https://res.cloudinary.com/dwyzndpyq/image/upload/v1771686423/10_fzwrmv.png",
  },
  {
    name: "Kenshi",
    area: { x1: 64.03, y1: 43.442, x2: 67.83, y2: 47.814 },
    image:
      "https://res.cloudinary.com/dwyzndpyq/image/upload/v1771686423/11_xmxapj.png",
  },
  {
    name: "Kung Lao",
    area: { x1: 21.869, y1: 40.814, x2: 27.318, y2: 45.014 },
    image:
      "https://res.cloudinary.com/dwyzndpyq/image/upload/v1771686422/12_en6utu.png",
  },
  {
    name: "Skarlet",
    area: { x1: 15.631, y1: 70.657, x2: 19.861, y2: 75.49 },
    image:
      "https://res.cloudinary.com/dwyzndpyq/image/upload/v1771686422/13_gpwali.png",
  },
  {
    name: "Raiden",
    area: { x1: 36.568, y1: 32.241, x2: 39.579, y2: 36.901 },
    image:
      "https://res.cloudinary.com/dwyzndpyq/image/upload/v1771686423/14_o11xaa.png",
  },
  {
    name: "Jade",
    area: { x1: 90.272, y1: 37.247, x2: 94.933, y2: 42.022 },
    image:
      "https://res.cloudinary.com/dwyzndpyq/image/upload/v1771686422/15_awnwxo.png",
  },
  {
    name: "Rain",
    area: { x1: 71.2, y1: 12.275, x2: 75.0, y2: 16.648 },
    image:
      "https://res.cloudinary.com/dwyzndpyq/image/upload/v1771686422/16_xrwcsp.png",
  },
  {
    name: "Shang Tsung",
    area: { x1: 44.383, y1: 50.768, x2: 46.606, y2: 53.818 },
    image:
      "https://res.cloudinary.com/dwyzndpyq/image/upload/v1771686421/17_iokswf.png",
  },
  {
    name: "Erron Black",
    area: { x1: 28.609, y1: 83.22, x2: 32.409, y2: 88.398 },
    image:
      "https://res.cloudinary.com/dwyzndpyq/image/upload/v1771686421/18_ky9etx.png",
  },
  {
    name: "Sindel",
    area: { x1: 60.731, y1: 70.197, x2: 63.743, y2: 77.447 },
    image:
      "https://res.cloudinary.com/dwyzndpyq/image/upload/v1771686420/19_ghd63r.png",
  },
  {
    name: "Fujin",
    area: { x1: 55.641, y1: 28.328, x2: 59.512, y2: 32.643 },
    image:
      "https://res.cloudinary.com/dwyzndpyq/image/upload/v1771686420/20_qdspms.png",
  },
  {
    name: "Havik",
    area: { x1: 93.141, y1: 80.746, x2: 98.16, y2: 85.349 },
    image:
      "https://res.cloudinary.com/dwyzndpyq/image/upload/v1771686421/21_tc94ua.png",
  },
  {
    name: "Shao Kahn",
    area: { x1: 76.362, y1: 67.224, x2: 80.163, y2: 73.323 },
    image:
      "https://res.cloudinary.com/dwyzndpyq/image/upload/v1771686421/22_zzz4lw.png",
  },
  {
    name: "Takeda",
    area: { x1: 15.918, y1: 47.392, x2: 19.861, y2: 52.283 },
    image:
      "https://res.cloudinary.com/dwyzndpyq/image/upload/v1771686421/23_u1arv9.png",
  },
  {
    name: "Cyrax",
    area: { x1: 16.133, y1: 15.248, x2: 19.861, y2: 19.966 },
    image:
      "https://res.cloudinary.com/dwyzndpyq/image/upload/v1771686420/24_hheaol.png",
  },
  {
    name: "Kano",
    area: { x1: 23.303, y1: 50.25, x2: 26.099, y2: 55.026 },
    image:
      "https://res.cloudinary.com/dwyzndpyq/image/upload/v1771686420/25_rhqtfy.png",
  },
];

export { mkBoard, mkCharacters };
