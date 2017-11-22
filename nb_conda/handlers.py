"""
# Copyright (c) 2015-2016 Continuum Analytics.
# See LICENSE.txt for the license.
"""
# pylint: disable=W0221

# Tornado get and post handlers often have different args from their base class
# methods.

import json
import os
import re

from subprocess import Popen
from tempfile import TemporaryFile

from pkg_resources import parse_version
from notebook.utils import url_path_join as ujoin
from notebook.base.handlers import (
    APIHandler,
    json_errors,
)
from tornado import web

from .py_lib.category import Category

NS = r'chemotion_dl'

class BaseHandler(APIHandler):
    @property
    def category(self):
        return self.settings['category']


class CategoryHandler(BaseHandler):
    @web.authenticated
    @json_errors
    def get(self):
        self.finish(json.dumps({ 'tree': self.category.tree() }))


# -----------------------------------------------------------------------------
# URL to handler mappings
# -----------------------------------------------------------------------------

default_handlers = [
    (r"/categories", CategoryHandler),
]


def load_jupyter_server_extension(nbapp):
    webapp = nbapp.web_app
    webapp.settings['category'] = Category()

    base_url = webapp.settings['base_url']
    webapp.add_handlers(".*$", [
        (ujoin(base_url, NS, pat), handler)
        for pat, handler in default_handlers
    ])
    nbapp.log.info("[chemotion_dl] enabled")
