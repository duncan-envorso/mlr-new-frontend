import { TAGS } from "@/lib/constants";
import { shopifyFetch } from "..";
import { ShopifyMenuOperation } from "../types";

// First, let's define proper types for our menu structure
interface MenuItem {
  id: string;
  title: string;
  url: string;
  items?: MenuItem[];
}

interface Menu {
  title: string;
  path: string;
  items?: Menu[];
}

export const getMenuQuery = /* GraphQL */ `
  query getMenu($handle: String!) {
    menu(handle: $handle) {
      items {
        id
        title
        url
        items {
          id
          title
          url
          items {
            id
            title
            url
            items {
              id
              title
              url
            }
          }
        }
      }
    }
  }
`;

export async function getMenu(handle: string, domain: string): Promise<Menu[]> { // Added domain parameter
  if (!handle) {
    console.warn('No menu handle provided to getMenu function');
    return [];
  }

  try {
    const res = await shopifyFetch<ShopifyMenuOperation>({
      query: getMenuQuery,
      tags: [TAGS.collections],
      variables: {
        handle: handle.trim()
      }
    });

    if (!res.body?.data?.menu?.items) {
      console.warn(`No menu found for handle: ${handle}`);
      return [];
    }

    // Recursive function to transform menu items
    const transformMenuItem = (item: MenuItem): Menu => ({
      title: item.title,
      path: item.url
        .replace(domain, '')
        .replace('/collections', '/search')
        .replace('/pages', ''),
      // Recursively transform child items if they exist
      ...(item.items && item.items.length > 0
        ? { items: item.items.map(transformMenuItem) }
        : {})
    });

    return res.body.data.menu.items.map(transformMenuItem); //This line was already correct
  } catch (error) {
    console.error(`Error fetching menu with handle ${handle}:`, error);
    return [];
  }
}