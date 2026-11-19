/**
 * Configurable download and official document URLs for
 * NIGHTSHIFT: JOJO'S GAS STATION.
 *
 * Replace "#" or "" with a live URL (https://..., http://..., or /files/...)
 * to enable the corresponding download or document button automatically.
 */

export const GAME_DOWNLOAD_URL = "#";
export const GAME_VERSION = "[VERSION PLACEHOLDER]";
export const GAME_FILE_SIZE = "[FILE SIZE PLACEHOLDER]";
export const GAME_RELEASE_STATUS = "COMING SOON";

export const GAME_DOCUMENTATION_URL =
  "https://nightshift-jojos-gas-station-docume.vercel.app/";
export const GAME_MANUAL_URL = "";
export const PROJECT_DOCUMENTATION_URL = "";
export const ADDITIONAL_RESOURCES_URL = "";

export function isValidResourceUrl(url: string): boolean {
  const trimmed = url.trim();
  if (!trimmed || trimmed === "#") {
    return false;
  }
  return (
    trimmed.startsWith("https://") ||
    trimmed.startsWith("http://") ||
    trimmed.startsWith("/")
  );
}

export interface OfficialDocumentItem {
  id: string;
  fileCode: string;
  title: string;
  description: string;
  url: string;
}

export const OFFICIAL_DOCUMENTS: OfficialDocumentItem[] = [
  {
    id: "game-documentation",
    fileCode: "DOC_01",
    title: "Game Documentation",
    description: "Official documentation and information about the game.",
    url: GAME_DOCUMENTATION_URL,
  },
  {
    id: "game-manual",
    fileCode: "DOC_02",
    title: "Game Manual",
    description: "Instructions, controls, and basic gameplay information.",
    url: GAME_MANUAL_URL,
  },
  {
    id: "project-documentation",
    fileCode: "DOC_03",
    title: "Project Documentation",
    description: "Development information and project background.",
    url: PROJECT_DOCUMENTATION_URL,
  },
  {
    id: "additional-resources",
    fileCode: "DOC_04",
    title: "Additional Resources",
    description: "Other official files related to the game.",
    url: ADDITIONAL_RESOURCES_URL,
  },
];
