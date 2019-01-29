import SemanticReleaseError from '@semantic-release/error';

import { makeClient } from './jira';
import { PluginConfig, PluginContext } from './types';

export async function verifyConditions(config: PluginConfig, context: PluginContext): Promise<void> {
  if (typeof config.jiraHost !== 'string') {
    throw new SemanticReleaseError(`config.jiraHost must be a string`);
  }
  if (typeof config.projectId !== 'string') {
    throw new SemanticReleaseError(`config.projectId must be a string`);
  }
  if (!Array.isArray(config.ticketPrefixes)) {
    throw new SemanticReleaseError(`config.ticketPrefixes must be an array of string`);
  }
  for (const prefix of config.ticketPrefixes) {
    if (typeof prefix !== 'string') {
      throw new SemanticReleaseError(`config.ticketPrefixes must be an array of string`);
    }
  }

  if (config.releaseNameTemplate) {
    if (typeof config.releaseNameTemplate !== 'string' || config.releaseNameTemplate!.indexOf('${version}') === -1) {
      throw new SemanticReleaseError('config.releaseNameTemplate must be a string containing ${version}');
    }
  }

  if (!context.env.JIRA_AUTH) {
    throw new SemanticReleaseError(`JIRA_AUTH must be a string`);
  }
  const jira = makeClient(config, context);
  await jira.project.getProject({ projectIdOrKey: config.projectId });
}
