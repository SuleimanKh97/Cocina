import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SofyanComponent } from './sofyan.component';

describe('SofyanComponent', () => {
  let component: SofyanComponent;
  let fixture: ComponentFixture<SofyanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SofyanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SofyanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
