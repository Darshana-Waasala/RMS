# additional note for backend API

### regarding leaves

> the leave will be denied automatically if until at the start date leave is not approved by PM or RM or any admin

1. the following method request for all the leaves that are not approved by admin but are not past leave requests, if the @Param:currentEmployee is an admin

```sh
public getPendingLeaves(currentEmp:Employee):Observable<Leaves[]>
in middle-layer.service.ts
```

2. the following method request for all the leaves that are not approved by admin but are not past leave requests, if the @Param:currentEmployee is an admin

```sh
public getPendingLeaves(currentEmp:Employee):Observable<Leaves[]>
in middle-layer.service.ts
```


