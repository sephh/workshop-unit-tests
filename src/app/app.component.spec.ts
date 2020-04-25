import {render, RenderResult} from '@testing-library/angular';
import {ComponentFixture} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {HeaderModule} from './core/layout/header/header.module';
import {LogoModule} from './core/layout/logo/logo.module';
import {RouterTestingModule} from '@angular/router/testing';

describe('AppComponent', () => {
  let renderResult: RenderResult<AppComponent>;
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    renderResult = await render(AppComponent, {
      imports: [
        RouterTestingModule,
        HeaderModule,
        LogoModule
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
