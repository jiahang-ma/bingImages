#!/bin/bash

rm -rf /usr/docker/nginx/html/*
cp -rf ./dist/*  /usr/docker/nginx/html/
