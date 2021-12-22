#!/usr/bin/env python3
"""
Basic Caching
"""

from base_caching import BaseCaching


class BasicCache(BaseCaching):
    """
    Caching class with set and get methods defined
    """

    def put(self, key, item):
        """
        Add an item in the cache
        """
        if not (key is None or item is None):
            self.cache_data[key] = item

    def get(self, key):
        """
        Get an item by key
        """
        return self.cache_data.get(key)
