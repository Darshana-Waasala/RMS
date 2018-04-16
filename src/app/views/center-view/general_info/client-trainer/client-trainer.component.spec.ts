import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientTrainerComponent } from './client-trainer.component';

describe('ClientTrainerComponent', () => {
  let component: ClientTrainerComponent;
  let fixture: ComponentFixture<ClientTrainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientTrainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientTrainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
