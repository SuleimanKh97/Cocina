import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaraComponent } from './sara.component';

describe('SaraComponent', () => {
  let component: SaraComponent;
  let fixture: ComponentFixture<SaraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
