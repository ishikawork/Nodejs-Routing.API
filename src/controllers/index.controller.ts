import { Controller, Get } from 'routing-controllers';

@Controller()
export class IndexController {
  @Get('/abc')
  index() {
    return 'OK';
  }
}
