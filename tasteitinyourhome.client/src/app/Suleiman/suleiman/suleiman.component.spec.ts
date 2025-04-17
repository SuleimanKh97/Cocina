import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuleimanComponent } from './suleiman.component';

describe('SuleimanComponent', () => {
  let component: SuleimanComponent;
  let fixture: ComponentFixture<SuleimanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuleimanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuleimanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
