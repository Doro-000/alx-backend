#!/usr/bin/env python3
"""
LRU caching system
"""

from base_caching import BaseCaching


class LRUCache(BaseCaching):
    """
    Caching that follows LRU(Least Recently Used) Cache replacement policy
    """

    def __init__(self):
        """
        Initialization
        """
        super().__init__()
        self.rank = {}
        self.def_rank = 0

    def put(self, key, item):
        """
        Add an item in the cache
        """
        if not (key is None or item is None):
            self.cache_data[key] = item
            self.rank[key] = self.def_rank
            if (len(self.cache_data) > BaseCaching.MAX_ITEMS):
                self.rank = dict(
                    sorted(
                        self.rank.items(),
                        key=lambda item: item[1],
                        reverse=True))
                discard = self.rank.popitem()
                del self.cache_data[discard[0]]
                print("DISCARD: {}".format(discard[0]))
            self.def_rank += 1

    def get(self, key):
        """
        Get an item by key
        """
        res = self.cache_data.get(key)
        if (res):
            self.def_rank += 1
            self.rank[key] = self.def_rank
        return res
