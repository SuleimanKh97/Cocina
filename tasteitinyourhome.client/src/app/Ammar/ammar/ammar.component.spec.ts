import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AmmarComponent } from './ammar.component';

describe('AmmarComponent', () => {
  let component: AmmarComponent;
  let fixture: ComponentFixture<AmmarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AmmarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AmmarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
