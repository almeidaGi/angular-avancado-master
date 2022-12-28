import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServeErrorMessageComponent } from './serve-error-message.component';

describe('ServeErrorMessageComponent', () => {
  let component: ServeErrorMessageComponent;
  let fixture: ComponentFixture<ServeErrorMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServeErrorMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServeErrorMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
