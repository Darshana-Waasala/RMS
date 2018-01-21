import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectUtilizationComponent } from './project-utilization.component';

describe('ProjectUtilizationComponent', () => {
  let component: ProjectUtilizationComponent;
  let fixture: ComponentFixture<ProjectUtilizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectUtilizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectUtilizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
