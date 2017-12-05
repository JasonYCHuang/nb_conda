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
from tornado import web, gen

from .py_lib.select_method import SelectMethod
from .py_lib.raw_file import RawFile
from .py_lib.convert import Convert

NS = r'chemotion_dl'

class BaseHandler(APIHandler):
    @property
    def select_method(self):
        return self.settings['select_method']

    @property
    def raw_file(self):
        return self.settings['raw_file']

    @property
    def convert(self):
        return self.settings['convert']

class SelectMethodHandler(BaseHandler):
    @web.authenticated
    @json_errors
    def get(self):
        self.finish(json.dumps({ 'tree': self.select_method.tree() }))


class RawFileHandler(BaseHandler):
    @web.authenticated
    @json_errors
    def get(self):
        self.finish(json.dumps({ 'files': self.raw_file.list_files() }))

    @web.authenticated
    @gen.coroutine
    def post(self):
        self.raw_file.save_files(self.request)
        self.finish(json.dumps({ 'files': self.raw_file.list_files() }))

    @web.authenticated
    @gen.coroutine
    def put(self):
        self.raw_file.delete_files(self.get_json_body())
        self.finish(json.dumps({ 'files': self.raw_file.list_files() }))

class ConvertHandler(BaseHandler):
    @web.authenticated
    @gen.coroutine
    def get(self):
        target = self.get_argument("target", None)
        topic = self.get_argument("topic", None)
        method = self.get_argument("method", None)
        self.convert.raw_files(target, topic, method)
        self.finish(json.dumps({ 'files': self.raw_file.list_files() }))

# -----------------------------------------------------------------------------
# URL to handler mappings
# -----------------------------------------------------------------------------

default_handlers = [
    (r"/select_methods", SelectMethodHandler),
    (r"/raw_files/convert", ConvertHandler),
    (r"/raw_files", RawFileHandler),
]

def load_jupyter_server_extension(nbapp):
    webapp = nbapp.web_app
    webapp.settings['select_method'] = SelectMethod()
    webapp.settings['raw_file'] = RawFile()
    webapp.settings['convert'] = Convert()

    base_url = webapp.settings['base_url']
    webapp.add_handlers(".*$", [
        (ujoin(base_url, NS, pat), handler)
        for pat, handler in default_handlers
    ])
    nbapp.log.info("[chemotion_dl] enabled")
