import {render, screen, RenderResult} from '@testing-library/angular';
import {ComponentFixture} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {HeaderModule} from './core/layout/header/header.module';
import {DummyTestComponent} from '../../__mocks__/DummyComponent';

describe('AppComponent', () => {
  let renderResult: RenderResult<AppComponent>;
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
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
    fixture = renderResult.fixture;
    component = fixture.componentInstance;
  });

  it('should create', () => {
    const {container} = renderResult;
    expect(container).toBeInTheDocument();
  });

  it('should navigate to dummy component', async () => {
    const {navigate} = renderResult;
    const headerLink = screen.getByTestId('loc-header-link');

    await navigate(headerLink);

    const dummyTestComponent = screen.getByText(/Hello World!/);

    expect(dummyTestComponent).toBeInTheDocument();
  });
});
