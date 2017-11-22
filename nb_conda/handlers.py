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

static = os.path.join(os.path.dirname(__file__), 'static')

NS = r'chemotion_dl'


class EnvBaseHandler(APIHandler):
    """
    Mixin for an env manager. Just maintains a reference to the
    'env_manager' which implements all of the conda functions.
    """
    @property
    def env_manager(self):
        """Return our env_manager instance"""
        return self.settings['env_manager']


class HalloHandler(APIHandler):
    """
    Handler for `GET /packages/search?q=<query>`, which uses CondaSearcher
    to search the available conda packages. Note, this is pretty slow
    and the nb_conda UI doesn't call it.
    """
    @web.authenticated
    @json_errors
    def get(self):
        self.finish(json.dumps({ 'msg': 'Hallo world - - - -- - - - -123' }))

class ByeHandler(APIHandler):
    """
    Handler for `GET /packages/search?q=<query>`, which uses CondaSearcher
    to search the available conda packages. Note, this is pretty slow
    and the nb_conda UI doesn't call it.
    """
    @web.authenticated
    @json_errors
    def get(self):
        self.finish(json.dumps({ 'msg': 'Bye, See you tomorrow.' }))
# -----------------------------------------------------------------------------
# URL to handler mappings
# -----------------------------------------------------------------------------

default_handlers = [
    (r"/hallo", HalloHandler),
    (r"/bye", ByeHandler),
]


def load_jupyter_server_extension(nbapp):
    """Load the nbserver extension"""
    webapp = nbapp.web_app
    # webapp.settings['env_manager'] = EnvManager(parent=nbapp)

    base_url = webapp.settings['base_url']
    webapp.add_handlers(".*$", [
        (ujoin(base_url, NS, pat), handler)
        for pat, handler in default_handlers
    ])
    nbapp.log.info("[chemotion_dl] enabled")
