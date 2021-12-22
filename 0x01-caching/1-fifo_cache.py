#!/usr/bin/env python3
"""
FIFO caching system
"""

from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """
    Caching that follows FIFO Cache replacement policy
    """

    def __init__(self):
        """
        Initialization
        """
        super().__init__()
        self.queue = []

    def put(self, key, item):
        """
        Add an item in the cache
        """
        if not (key is None or item is None):
            self.cache_data[key] = item
            self.queue.append(key)
            if (len(self.cache_data) > BaseCaching.MAX_ITEMS):
                discard = self.queue.pop(0)
                del self.cache_data[discard]
                print("DISCARD: {}".format(discard))

    def get(self, key):
        """
        Get an item by key
        """
        return self.cache_data.get(key)
