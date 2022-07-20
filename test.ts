/*
|--------------------------------------------------------------------------
| Tests
|--------------------------------------------------------------------------
|
| The contents in this file boots the AdonisJS application and configures
| the Japa tests runner.
|
| For the most part you will never edit this file. The configuration
| for the tests can be controlled via ".adonisrc.json" and
| "tests/bootstrap.ts" files.
|
*/

process.env.NODE_ENV = 'test'

import 'reflect-metadata'
import sourceMapSupport from 'source-map-support'
import { Ignitor } from '@adonisjs/core/build/standalone'
import { configure, processCliArgs, run, RunnerHooksHandler } from '@japa/runner'
import { apiClient } from '@japa/api-client'
import { assert } from '@japa/assert'

sourceMapSupport.install({ handleUncaughtExceptions: false })

const kernel = new Ignitor(__dirname).kernel('test')
const BASE_URL = `http://127.0.0.1:3333`

kernel
  .boot()
  .then(() => import('./tests/bootstrap'))
  .then(({ runnerHooks, ...config }) => {
    const app: RunnerHooksHandler[] = [() => kernel.start()]

    configure({
      ...kernel.application.rcFile.tests,
      ...processCliArgs(process.argv.slice(2)),
      ...config,
      ...{
        importer: (filePath) => import(filePath),
        setup: app.concat(runnerHooks.setup),
        teardown: runnerHooks.teardown,
        plugins: [apiClient(BASE_URL), assert()]
      },
      cwd: kernel.application.appRoot,
    })

    run()
  })
