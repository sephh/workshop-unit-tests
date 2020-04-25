import {render} from '@testing-library/angular';

import {LogoComponent} from './logo.component';
import {ComponentFixture} from '@angular/core/testing';

describe('LogoComponent', () => {
  let component: LogoComponent;
  let fixture: ComponentFixture<LogoComponent>;

  beforeEach(async () => {
    const {fixture: componentFixture} = await render(LogoComponent);
    fixture = componentFixture;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
