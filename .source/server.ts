// @ts-nocheck
import { default as __fd_glob_15 } from "../content/docs/organization-creation/meta.json?collection=meta"
import { default as __fd_glob_14 } from "../content/docs/storage/meta.json?collection=meta"
import { default as __fd_glob_13 } from "../content/docs/network-settings/meta.json?collection=meta"
import { default as __fd_glob_12 } from "../content/docs/container-creation/meta.json?collection=meta"
import { default as __fd_glob_11 } from "../content/docs/meta.json?collection=meta"
import * as __fd_glob_10 from "../content/docs/storage/index.mdx?collection=docs"
import * as __fd_glob_9 from "../content/docs/network-settings/index.mdx?collection=docs"
import * as __fd_glob_8 from "../content/docs/organization-creation/team-creation.mdx?collection=docs"
import * as __fd_glob_7 from "../content/docs/organization-creation/resource-allocation.mdx?collection=docs"
import * as __fd_glob_6 from "../content/docs/organization-creation/member-invite.mdx?collection=docs"
import * as __fd_glob_5 from "../content/docs/organization-creation/index.mdx?collection=docs"
import * as __fd_glob_4 from "../content/docs/container-creation/index.mdx?collection=docs"
import * as __fd_glob_3 from "../content/docs/container-creation/container-access.mdx?collection=docs"
import * as __fd_glob_2 from "../content/docs/index.mdx?collection=docs"
import * as __fd_glob_1 from "../content/docs/glossary.mdx?collection=docs"
import * as __fd_glob_0 from "../content/docs/account-creation.mdx?collection=docs"
import { server } from 'fumadocs-mdx/runtime/server';
import type * as Config from '../source.config';

const create = server<typeof Config, import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
  DocData: {
  }
}>({"doc":{"passthroughs":["extractedReferences"]}});

export const docs = await create.doc("docs", "content/docs", {"account-creation.mdx": __fd_glob_0, "glossary.mdx": __fd_glob_1, "index.mdx": __fd_glob_2, "container-creation/container-access.mdx": __fd_glob_3, "container-creation/index.mdx": __fd_glob_4, "organization-creation/index.mdx": __fd_glob_5, "organization-creation/member-invite.mdx": __fd_glob_6, "organization-creation/resource-allocation.mdx": __fd_glob_7, "organization-creation/team-creation.mdx": __fd_glob_8, "network-settings/index.mdx": __fd_glob_9, "storage/index.mdx": __fd_glob_10, });

export const meta = await create.meta("meta", "content/docs", {"meta.json": __fd_glob_11, "container-creation/meta.json": __fd_glob_12, "network-settings/meta.json": __fd_glob_13, "storage/meta.json": __fd_glob_14, "organization-creation/meta.json": __fd_glob_15, });