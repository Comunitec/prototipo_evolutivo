import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSaibaMaisVideoComponent } from './modal-saiba-mais-video.component';

describe('ModalSaibaMaisVideoComponent', () => {
  let component: ModalSaibaMaisVideoComponent;
  let fixture: ComponentFixture<ModalSaibaMaisVideoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalSaibaMaisVideoComponent]
    });
    fixture = TestBed.createComponent(ModalSaibaMaisVideoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
