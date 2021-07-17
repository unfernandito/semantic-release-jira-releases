import { Version2Client } from "jira.js";

import { PluginConfig } from "./types";

export function makeClient(config: PluginConfig): Version2Client {
  return new Version2Client({
    host: config.jiraHost,
    telemetry: false,
    authentication: config.authentication,
  });
}
