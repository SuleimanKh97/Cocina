import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SondosComponent } from './sondos.component';

describe('SondosComponent', () => {
  let component: SondosComponent;
  let fixture: ComponentFixture<SondosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SondosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SondosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
