import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UplaodFileComponent } from './uplaod-file.component';

describe('UplaodFileComponent', () => {
  let component: UplaodFileComponent;
  let fixture: ComponentFixture<UplaodFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UplaodFileComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UplaodFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
