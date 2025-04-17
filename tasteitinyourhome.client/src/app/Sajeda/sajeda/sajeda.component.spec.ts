import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SajedaComponent } from './sajeda.component';

describe('SajedaComponent', () => {
  let component: SajedaComponent;
  let fixture: ComponentFixture<SajedaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SajedaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SajedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
