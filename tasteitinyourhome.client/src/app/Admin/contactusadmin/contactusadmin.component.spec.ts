import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactusadminComponent } from './contactusadmin.component';

describe('ContactusadminComponent', () => {
  let component: ContactusadminComponent;
  let fixture: ComponentFixture<ContactusadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactusadminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactusadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
