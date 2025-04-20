import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PtofileComponent } from './ptofile.component';

describe('PtofileComponent', () => {
  let component: PtofileComponent;
  let fixture: ComponentFixture<PtofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PtofileComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PtofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
