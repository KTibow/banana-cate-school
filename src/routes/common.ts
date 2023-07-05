export const colors = {
  RED: "#7f1d1d",
  YELLOW: "#713f12",
  GREEN: "#14532d",
  CYAN: "#164e63",
  BLUE: "#1e3a8a",
  MAGENTA: "#831843",
  NONE: "#1f2937",
};
export type TaskData = {
  subject: string;
  name: string;
  date: string;
  color: keyof typeof colors;
  tags: string;
};
