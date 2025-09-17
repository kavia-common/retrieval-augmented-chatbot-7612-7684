#!/bin/bash
cd /home/kavia/workspace/code-generation/retrieval-augmented-chatbot-7612-7684/frontend_web
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

