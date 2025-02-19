export const AllGame = [
  {
    Name: "Fantasian Neo Dimension",
    url: "https://res.cloudinary.com/dw32kbavt/image/upload/v1734187881/ShopGamedd/Stray/wwjvncrfnhcieokb90ac.webp",
  },
  {
    Name: "Fantasian Neo Dimension",
    url: "https://res.cloudinary.com/dw32kbavt/image/upload/v1734188919/ShopGamedd/Dragon%20Age:%20The%20Veilguard/ogb4s6aeahltw7twarxa.webp",
  },
];

export const AllGame1 = [
  {
    Name: "Fantasian Neo Dimension",
  },
  {
    Name: "Fantasian Neo Dimension",
  },
  {
    Name: "Fantasian Neo Dimension",
  },
  {
    Name: "Fantasian Neo Dimension",
  },
  {
    Name: "Fantasian Neo Dimension",
  },
  {
    Name: "Fantasian Neo Dimension",
  },
  {
    Name: "Fantasian Neo Dimension",
  },
];

export const AllGame2 = [
  {
    Name: "Fantasian Neo Dimension",
  },
  {
    Name: "Fantasian Neo Dimension",
  },
  {
    Name: "Fantasian Neo Dimension",
  },
  {
    Name: "Fantasian Neo Dimension",
  },
  {
    Name: "Fantasian Neo Dimension",
  },
  {
    Name: "Fantasian Neo Dimension",
  },
];

export function nFormatter(num: number, digits: number) {
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "k" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const regexp = /\.0+$|(?<=\.[0-9]*[1-9])0+$/;
  const item = lookup.findLast((item) => num >= item.value);
  return item
    ? (num / item.value).toFixed(digits).replace(regexp, "").concat(item.symbol)
    : "0";
}

export const VNvnd = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

export enum GameVersion {
  Standard,
  Deluxe,
  Premium,
  Ultimates,
  EarlyAccess,
  Demo,
  Patch,
  DLC,
  SoundTrack,
}

export const GameVersionString = [
  "Standard",
  "Deluxe",
  "Premium",
  "Ultimates",
  "EarlyAccess",
  "Demo",
  "Patch",
  "DLC",
  "SoundTrack",
];

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

export function formatDateTime(dateString: string) {
  const date = new Date(dateString);

  const pad = (num: Number) => String(num).padStart(2, "0");

  const dd = pad(date.getDate());
  const mm = pad(date.getMonth() + 1); // Months are zero-based
  const yyyy = date.getFullYear();
  const hh = pad(date.getHours());
  const min = pad(date.getMinutes());
  const ss = pad(date.getSeconds());

  return `${dd}-${mm}-${yyyy} ${hh}:${min}:${ss}`;
}
