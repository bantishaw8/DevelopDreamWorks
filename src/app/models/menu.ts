export interface Menu {
  title: string;
  icon: string;
  url: string;
  active: boolean;
  submenu?: { title: string; url: string; icon: string; }[];
}
