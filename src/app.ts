import 'reflect-metadata';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import express from 'express';
import helmet from 'helmet';
import hpp from 'hpp';
import morgan from 'morgan';
import { NODE_ENV, PORT, LOG_FORMAT } from '@config';
import errorMiddleware from '@middlewares/error.middleware';
import { logger, stream } from '@utils/logger';
import { InversifyExpressServer } from 'inversify-express-utils';
import { diContainer, Container } from './config/inversify.config'
import * as swagger from '@inversify-cn/swagger-express-ts';

class App {
  public container: Container;
  public server: InversifyExpressServer;
  public app: express.Application;
  public env: string;
  public port: string | number;

  constructor() {
    this.env = NODE_ENV || 'development';
    this.port = PORT || 4000;
    
    this.container = diContainer;
    this.server =  new InversifyExpressServer(diContainer, null, { rootPath: "/api" }, this.app);
    this.server.setConfig((app: express.Application) => {
      this.initializeMiddlewares(app);
    });
    this.server.setErrorConfig((app: express.Application) => {
      this.initializeErrorHandling(app);
    });
    this.app = this.server.build();
    this.app.listen(this.port, () => {
      console.log(
        `⚡️[server]: Server is running at https://localhost:${this.port}`
      );
    });
  }

  // public listen() {
  //   this.app.listen(process.env.PORT || 3000, () =>{
  //     logger.info(`=================================`);
  //     logger.info(`======= ENV: ${this.env} =======`);
  //     logger.info(`🚀 App listening on the port ${this.port}`);
  //     logger.info(`=================================`);
  //   });
  // }

  private initializeMiddlewares(app: express.Application) {
    this.initializeSwagger(app);
    app.use(morgan(LOG_FORMAT, { stream }));
    app.use(hpp());
    app.use(helmet());
    app.use(compression());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
  }

  private initializeSwagger(app: express.Application): void {
    app.use('/api-docs/swagger', express.static('swagger'));
    app.use(
      '/api-docs/swagger/assets',
      express.static('node_modules/swagger-ui-dist')
    );
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(
      swagger.express({
        definition: {
          info: {
            title: 'My api',
            version: '1.0'
          },
          externalDocs: {
            url: 'My url'
          }
          // Models can be defined here
        }
      })
    );
  }

  private initializeErrorHandling(app: express.Application) {
    app.use(errorMiddleware);
  }
}

export default App;
