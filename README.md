# Primeiro teste

Vamos criar nosso primeiro teste

## LogoComponent

Vamos testar o component que esta na pasta `src/core/layout/logo`.

Substitua o código do arquivo `logo.component.spec.ts`

```
import {render, RenderResult} from '@testing-library/angular';
import {ComponentFixture} from '@angular/core/testing';

import {LogoComponent} from './logo.component';

describe('LogoComponent', () => {
  let renderResult: RenderResult<LogoComponent>;
  let fixture: ComponentFixture<LogoComponent>;
  let component: LogoComponent;

  beforeEach(async () => {
    renderResult = await render(LogoComponent, {});
    fixture = renderResult.fixture;
    component = fixture.componentInstance;
  });

  it('should create', () => {
    const {container} = renderResult;
    expect(container).toBeInTheDocument();
  });
});
```

Rode o comando na raiz

```
npm run test:app -- --watch
```

Aperte a tecla `p` e depois aperte novamente `p` para escolher o arquivo que quer testar.

Digite `logo.component` e aprte a tecla `Enter`.
