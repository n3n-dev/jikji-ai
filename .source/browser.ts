// @ts-nocheck
import { browser } from 'fumadocs-mdx/runtime/browser';
import type * as Config from '../source.config';

const create = browser<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>();
const browserCollections = {
  docs: create.doc("docs", {"account-creation.mdx": () => import("../content/docs/account-creation.mdx?collection=docs"), "glossary.mdx": () => import("../content/docs/glossary.mdx?collection=docs"), "index.mdx": () => import("../content/docs/index.mdx?collection=docs"), "container-creation/container-access.mdx": () => import("../content/docs/container-creation/container-access.mdx?collection=docs"), "container-creation/index.mdx": () => import("../content/docs/container-creation/index.mdx?collection=docs"), "network-settings/index.mdx": () => import("../content/docs/network-settings/index.mdx?collection=docs"), "organization-creation/index.mdx": () => import("../content/docs/organization-creation/index.mdx?collection=docs"), "organization-creation/member-invite.mdx": () => import("../content/docs/organization-creation/member-invite.mdx?collection=docs"), "organization-creation/resource-allocation.mdx": () => import("../content/docs/organization-creation/resource-allocation.mdx?collection=docs"), "organization-creation/team-creation.mdx": () => import("../content/docs/organization-creation/team-creation.mdx?collection=docs"), "storage/index.mdx": () => import("../content/docs/storage/index.mdx?collection=docs"), }),
};
export default browserCollections;