#!/usr/bin/env python3
"""
LIFO caching system
"""

from base_caching import BaseCaching


class LIFOCache(BaseCaching):
    """
    Caching that follows LIFO Cache replacement policy
    """

    def __init__(self):
        """
        Initialization
        """
        super().__init__()
        self.stack = []

    def put(self, key, item):
        """
        Add an item in the cache
        """
        if not (key is None or item is None):
            self.cache_data[key] = item
            if (len(self.cache_data) > BaseCaching.MAX_ITEMS):
                discard = self.stack.pop(0)
                del self.cache_data[discard]
                print("DISCARD: {}".format(discard))
            self.stack.insert(0, key)

    def get(self, key):
        """
        Get an item by key
        """
        return self.cache_data.get(key)
