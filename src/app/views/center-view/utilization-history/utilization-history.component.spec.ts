import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UtilizationHistoryComponent } from './utilization-history.component';

describe('UtilizationHistoryComponent', () => {
  let component: UtilizationHistoryComponent;
  let fixture: ComponentFixture<UtilizationHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UtilizationHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UtilizationHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
