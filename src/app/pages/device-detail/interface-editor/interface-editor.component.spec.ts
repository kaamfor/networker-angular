import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InterfaceEditorComponent } from './interface-editor.component';

describe('InterfaceEditorComponent', () => {
  let component: InterfaceEditorComponent;
  let fixture: ComponentFixture<InterfaceEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InterfaceEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InterfaceEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
