import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortforwardingEditorComponent } from './portforwarding-editor.component';

describe('PortforwardingEditorComponent', () => {
  let component: PortforwardingEditorComponent;
  let fixture: ComponentFixture<PortforwardingEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortforwardingEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PortforwardingEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
