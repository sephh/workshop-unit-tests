import {render, screen, RenderResult} from '@testing-library/angular';
import {ComponentFixture} from '@angular/core/testing';
import {MatToolbarModule} from '@angular/material/toolbar';
import {RouterTestingModule} from '@angular/router/testing';

import {HeaderComponent} from './header.component';
import {LogoModule} from '../logo/logo.module';

describe('HeaderComponent', () => {
  let renderResult: RenderResult<HeaderComponent>;
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;

  beforeEach(async () => {
    renderResult = await render(HeaderComponent, {
      imports: [
        LogoModule,
        MatToolbarModule,
        RouterTestingModule
      ]
    });
    fixture = renderResult.fixture;
    component = fixture.componentInstance;
  });

  it('should create', () => {
    const {container} = renderResult;
    expect(container).toBeInTheDocument();
  });

  it('should navigate on logo click', async () => {
    const {navigate} = renderResult;
    const headerLink = screen.getByTestId('loc-header-link') as HTMLAnchorElement;

    expect(headerLink.pathname).toBe('/');

    const isNavigate = await navigate(headerLink);

    expect(isNavigate).toBeTruthy();
  });
});
