/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entities.service;

import entities.Productcard;
import java.util.List;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 *
 * @author Joni
 */
@Stateless
@Path("productcard")
public class ProductcardFacadeREST extends AbstractFacade<Productcard> {

    @PersistenceContext(unitName = "fashionAppPU")
    private EntityManager em;

    public ProductcardFacadeREST() {
        super(Productcard.class);
    }

    @POST
    @Override
    @Consumes({MediaType.APPLICATION_JSON})
    @Produces(MediaType.APPLICATION_JSON)
    public Productcard create(Productcard entity) {
        super.create(entity);
        return entity;
    }

    @PUT
    @Path("{id}")
    @Consumes({MediaType.APPLICATION_JSON})
    public void edit(@PathParam("id") Integer id, Productcard entity) {
        super.edit(entity);
    }

    @DELETE
    @Path("{id}")
    public void remove(@PathParam("id") Integer id) {
        super.remove(super.find(id));
    }

    @GET
    @Path("{id}")
    @Produces({MediaType.APPLICATION_JSON})
    public Productcard find(@PathParam("id") Integer id) {
        return super.find(id);
    }

    @GET
    @Override
    @Produces({MediaType.APPLICATION_JSON})
    public List<Productcard> findAll() {
        return super.findAll();
    }

    @GET
    @Path("{from}/{to}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Productcard> findRange(@PathParam("from") Integer from, @PathParam("to") Integer to) {
        return super.findRange(new int[]{from, to});
    }

    @GET
    @Path("count")
    @Produces(MediaType.TEXT_PLAIN)
    public String countREST() {
        return String.valueOf(super.count());
    }
    @GET
    @Path("type/{command}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Productcard> findByNativeQuery(@PathParam("command") String command) {
        String syote = "select * from productcard where type="+command;
        return super.findByNativeQuery(syote);
    }
    
    @GET
    @Path("category/{command}")
    @Produces({MediaType.APPLICATION_JSON})
    public List<Productcard> findByNativeQuery2(@PathParam("command") String command) {
        String syote = "select * from productcard where category="+command;
        return super.findByNativeQuery(syote);
    }

    @Override
    protected EntityManager getEntityManager() {
        return em;
    }
    
}
