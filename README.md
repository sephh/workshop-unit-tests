# 03 - Testando rotas

Vamos repetir o mesmo procedimento feito no capítulo anterior, mas no HeaderComponent.

## HeaderComponent

Vamos testar o component que esta na pasta `src/core/layout/header`.

Substitua o código do arquivo `header.component.spec.ts`

```
import {ComponentFixture} from '@angular/core/testing';
import {HeaderComponent} from './header.component';

describe('HeaderComponent', () => {
  let renderResult: RenderResult<HeaderComponent>;
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;

  beforeEach(async () => {
    renderResult = await render(HeaderComponent, {});
    fixture = renderResult.fixture;
    component = fixture.componentInstance;
  });

  it('should create', function() {
    const {container} = renderResult;
    expect(container).toBeTruthy();
  });
});
```

Rode o comando na raiz

```
npm run test:app -- --watch
```

Aperte a tecla `p` e depois aperte novamente `p` para escolher o arquivo que quer testar.

Digite `header.component` e aprte a tecla `Enter`.

Oops!! Parece que não deu certo.

## Corrigindo os erros de dependência

Atualize a função de render com as dependências necessárias e o teste irá passar.

```
renderResult = await render(HeaderComponent, {
      imports:[
        LogoModule,
        MatToolbarModule,
        RouterTestingModule
      ]
    });
```

## Checando se a logo possui um link

Agora vamos verificar se nossa logo tem um link.

```
it('should navigate on logo click', async () => {
    const {navigate} = renderResult;
    const headerLink = screen.getByTestId('loc-header-link') as HTMLAnchorElement;
    
    expect(headerLink.pathname).toBe('/');
    
    const isNavigate = await navigate(headerLink);
    
    expect(isNavigate).toBeTruthy();
});
```

## Testando a navegação para outro componente

Para esse tipo de teste é necessário que seu componente possua um `router-outlet` e é o caso do AppComponent.

Vamos testá-lo, então.

Primeiro vamos criar nosso teste básico de renderização.

```
import {render, RenderResult} from '@testing-library/angular';
import {ComponentFixture} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';

import {AppComponent} from './app.component';
import {HeaderModule} from './core/layout/header/header.module';

describe('AppComponent', () => {
  let renderResult: RenderResult<AppComponent>;
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    renderResult = await render(AppComponent, {
      imports: [
        HeaderModule,
        RouterTestingModule
      ],
    });
    fixture = renderResult.fixture;
    component = fixture.componentInstance;
  });

  it('should create', () => {
    const {container} = renderResult;
    expect(container).toBeInTheDocument();
  });
});
```

Agora vamos adicionar nossa rota e o teste de navegação.

Atualize a função de render e importe nosso DummyComponent.

```
import {DummyTestComponent} from '../../__mocks__/DummyComponent';
```

```
renderResult = await render(AppComponent, {
      declarations: [
        DummyTestComponent
      ],
      imports: [
        HeaderModule
      ],
      routes: [
        {
          path: '',
          component: DummyTestComponent
        }
      ]
    });
```

E por fim vamos adicionar o teste.

```
it('should navigate to dummy component', async () => {
    const {navigate} = renderResult;
    const headerLink = screen.getByTestId('loc-header-link');

    await navigate(headerLink);

    const dummyTestComponent = screen.getByText(/Hello World!/);

    expect(dummyTestComponent).toBeInTheDocument();
  });
```

Tudo deve funcionar.
